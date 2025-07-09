#!/bin/bash

SOURCE_FILE="./json-view.js"
DEST_FOLDER="$HOME/Library/Mobile Documents/iCloud~dk~simonbs~Scriptable/Documents"

# Make sure the source file exists
if [ ! -f "$SOURCE_FILE" ]; then
  echo "❌ Source file does not exist: $SOURCE_FILE"
  exit 1
fi

# Make sure the destination folder exists
if [ ! -d "$DEST_FOLDER" ]; then
  echo "❌ Scriptable iCloud folder not found: $DEST_FOLDER"
  echo "Make sure iCloud Drive is enabled and Scriptable has iCloud access."
  exit 1
fi

cp "$SOURCE_FILE" "$DEST_FOLDER"
echo "✅ Copied $(basename "$SOURCE_FILE") to Scriptable iCloud folder."