def process_text(input_file, output_file):
    with open(input_file, 'r') as f:
        lines = f.readlines()

    output_lines = []
    in_hymn_of_praise = False
    in_contemplation = False
    in_homily = False

    for line in lines:
        line = line.strip()
        if line == 'REFLECTION':
            in_hymn_of_praise = True
            output_lines.append('## HYMN OF PRAISE\n<div style={{textAlign:\'center\'}}>\n')
            continue
        if line == 'HYMN OF PRAISE':
            in_hymn_of_praise = True
            output_lines.append('## HYMN OF PRAISE\n<div style={{textAlign:\'center\'}}>\n')
            continue
        if line == 'CONTEMPLATION':
            in_contemplation = True
            output_lines.append('## CONTEMPLATION\n')
            continue
        if line == 'HOMILY':
            in_homily = True
            output_lines.append('## HOMILY\n<div style={{textAlign:\'center\'}}>\n')
            continue
        if line.startswith('To contemplate'):
            output_lines.append(line + '\n')
            continue
        if in_hymn_of_praise or in_contemplation or in_homily:
            if line.startswith('1.') or line.startswith('2.') or line.startswith('3.'):
                output_lines.append('\n')
            output_lines.append(line + '\n')
        else:
            if line:
                output_lines.append(line + '  \n')  # Add two spaces for Markdown line breaks

    with open(output_file, 'w') as f:
        f.writelines(output_lines)

if __name__ == "__main__":
    input_file = "input.txt"
    output_file = "output.mdx"
    process_text(input_file, output_file)
