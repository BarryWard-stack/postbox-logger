# (c) 2025 Insight Geospatial, Eurotech Marine Data Services Ltd. All rights reserved.
# Author: Barry Ward
# License: Proprietary - Not for redistribution without written consent.
# Version: v1.0.0
# Last Modified: 2024-12-18 14:50:00
#
# CHANGELOG:
# v1.0.0 (2024-12-18):
#   - FEAT: Initial release - directory structure capture utility
#   - CHANGES: Captures folder structure with file sizes and extensions
#   - TESTED: Works with standard Windows paths

"""
Directory Structure Capture Utility

Usage:
    python capture_structure.py <start_path> [output_file]
    
Example:
    python capture_structure.py "C:\Insight_Workspace\Projects\Insight Scripts - Aries" structure.txt
    
Output Format:
    - Tree-style view with indentation
    - File sizes in human-readable format
    - File extensions shown
    - Folder counts (files/subdirs)
"""

import os
import sys
from pathlib import Path

# Folders to ignore (common development/system folders)
IGNORE_FOLDERS = {
    '__pycache__', '.git', '.venv', 'venv', 'env', 
    'node_modules', '.idea', '.vscode', '__MACOSX',
    '.DS_Store', 'Thumbs.db'
}

# File extensions to ignore (optional - set to empty set to capture all)
IGNORE_EXTENSIONS = {
    # '.pyc', '.pyo', '.pyd'  # Uncomment to ignore compiled Python
}

def human_readable_size(size_bytes):
    """Convert bytes to human-readable format"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} PB"

def capture_structure(root_path, output_file=None, max_depth=None):
    """
    Capture directory structure and write to file or stdout
    
    Args:
        root_path: Starting directory path
        output_file: Optional output file path (None = stdout)
        max_depth: Optional max depth to traverse (None = unlimited)
    """
    root_path = Path(root_path).resolve()
    
    if not root_path.exists():
        print(f"Error: Path does not exist: {root_path}")
        return False
    
    if not root_path.is_dir():
        print(f"Error: Path is not a directory: {root_path}")
        return False
    
    # Prepare output
    lines = []
    lines.append(f"DIRECTORY STRUCTURE CAPTURE")
    lines.append(f"{'=' * 80}")
    lines.append(f"Root Path: {root_path}")
    lines.append(f"Generated: {Path(__file__).name}")
    lines.append(f"{'=' * 80}\n")
    
    # Statistics
    stats = {
        'total_files': 0,
        'total_dirs': 0,
        'total_size': 0,
        'by_extension': {}
    }
    
    def walk_directory(path, prefix="", depth=0):
        """Recursive directory walker"""
        if max_depth is not None and depth > max_depth:
            return
        
        try:
            entries = sorted(path.iterdir(), key=lambda x: (not x.is_dir(), x.name.lower()))
        except PermissionError:
            lines.append(f"{prefix}[Permission Denied]")
            return
        
        # Filter entries
        entries = [e for e in entries if e.name not in IGNORE_FOLDERS]
        
        for idx, entry in enumerate(entries):
            is_last = (idx == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            extension = "    " if is_last else "│   "
            
            if entry.is_dir():
                # Directory
                stats['total_dirs'] += 1
                
                # Count contents
                try:
                    contents = list(entry.iterdir())
                    file_count = sum(1 for c in contents if c.is_file())
                    dir_count = sum(1 for c in contents if c.is_dir())
                    info = f"[{file_count} files, {dir_count} subdirs]"
                except PermissionError:
                    info = "[Permission Denied]"
                
                lines.append(f"{prefix}{connector}{entry.name}/ {info}")
                
                # Recurse
                walk_directory(entry, prefix + extension, depth + 1)
                
            else:
                # File
                ext = entry.suffix.lower()
                
                # Skip ignored extensions
                if ext in IGNORE_EXTENSIONS:
                    continue
                
                stats['total_files'] += 1
                
                try:
                    size = entry.stat().st_size
                    stats['total_size'] += size
                    stats['by_extension'][ext] = stats['by_extension'].get(ext, 0) + 1
                    size_str = human_readable_size(size)
                except:
                    size_str = "[Unknown]"
                
                lines.append(f"{prefix}{connector}{entry.name} ({size_str})")
    
    # Start walking
    lines.append(f"{root_path.name}/")
    walk_directory(root_path, "", 0)
    
    # Add statistics
    lines.append(f"\n{'=' * 80}")
    lines.append(f"STATISTICS")
    lines.append(f"{'=' * 80}")
    lines.append(f"Total Directories: {stats['total_dirs']}")
    lines.append(f"Total Files: {stats['total_files']}")
    lines.append(f"Total Size: {human_readable_size(stats['total_size'])}")
    
    if stats['by_extension']:
        lines.append(f"\nFiles by Extension:")
        for ext, count in sorted(stats['by_extension'].items(), key=lambda x: -x[1]):
            ext_display = ext if ext else "[no extension]"
            lines.append(f"  {ext_display}: {count}")
    
    # Write output
    output_text = "\n".join(lines)
    
    if output_file:
        output_path = Path(output_file)
        output_path.write_text(output_text, encoding='utf-8')
        print(f"Structure captured to: {output_path.resolve()}")
        print(f"Total: {stats['total_dirs']} directories, {stats['total_files']} files")
    else:
        print(output_text)
    
    return True

def main():
    """Command-line interface"""
    if len(sys.argv) < 2:
        print("Usage: python capture_structure.py <start_path> [output_file] [max_depth]")
        print("\nExample:")
        print('  python capture_structure.py "C:\\Insight_Workspace\\Projects" structure.txt')
        print('  python capture_structure.py "C:\\Insight_Workspace\\Projects" structure.txt 3')
        print("\nOptions:")
        print("  start_path    - Directory to scan")
        print("  output_file   - Output file path (optional, prints to console if omitted)")
        print("  max_depth     - Maximum depth to traverse (optional, unlimited if omitted)")
        sys.exit(1)
    
    start_path = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None
    max_depth = int(sys.argv[3]) if len(sys.argv) > 3 else None
    
    success = capture_structure(start_path, output_file, max_depth)
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()