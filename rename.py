import os

# Define the directory containing the files
directory = "."

# Loop through each day from 1st to 31st
for i in range(1, 32):
    # Construct the old and new file names
    if i % 10 == 1 and i != 11:
        ordinal_suffix = "st"
    elif i % 10 == 2 and i != 12:
        ordinal_suffix = "nd"
    elif i % 10 == 3 and i != 13:
        ordinal_suffix = "rd"
    else:
        ordinal_suffix = "th"

    old_filename = f"{i}{ordinal_suffix}.en copy.mdx"
    new_filename = f"{i}{ordinal_suffix}.sr.mdx"

    # Construct the full paths for the files
    old_path = os.path.join(directory, old_filename)
    new_path = os.path.join(directory, new_filename)

    # Check if the old file exists
    if os.path.exists(old_path):
        # Rename the file
        os.rename(old_path, new_path)
        print(f"Renamed {old_filename} to {new_filename}")
    else:
        print(f"File {old_filename} not found.")

print("All files renamed successfully.")
