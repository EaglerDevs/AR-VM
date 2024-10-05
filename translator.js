// Basic console log and alert for debugging
alert("You EaglerPatrol folks will NEVER catch me lacking")
// Main translation function
function RaveVM(javaCode) {
    const lines = javaCode.split('\n');
    let pythonCode = '';
    let indentationLevel = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Adjust indentation for curly braces
        if (trimmedLine.endsWith('{')) {
            pythonCode += '    '.repeat(indentationLevel) + trimmedLine.replace('{', ':') + '\n';
            indentationLevel++;
        } else if (trimmedLine === '}') {
            indentationLevel--;
        } else {
            let translatedLine = translateLine(trimmedLine);
            pythonCode += '    '.repeat(indentationLevel) + translatedLine + '\n';
        }
    });

    return pythonCode.trim(); // Return trimmed code
}

// Line translation logic
function translateLine(line) {
    return line
        .replace(/public\s+/g, '') // Access modifiers
        .replace(/private\s+/g, '')
        .replace(/protected\s+/g, '')
        .replace(/static\s+/g, '')
        .replace(/void\s+/g, '')
        .replace(/System\.out\.println\((.+?)\);/g, 'print($1)') // Print statements
        .replace(/;\s*$/g, '') // Remove semicolons
        .replace(/(\w+)\s+(\w+)\s*=\s*(.+?);/g, '$1 $2 = $3') // Variable assignments
        .replace(/public class/g, 'class') // Class declaration
        .replace(/main\s*\(String\[\]\s*\w+\)\s*{/g, 'if __name__ == "__main__":') // Main method
        .replace(/for\s*\((.*?)\)\s*{/g, 'for $1:') // For loops
        .replace(/while\s*\((.*?)\)\s*{/g, 'while $1:') // While loops
        .replace(/if\s*\((.*?)\)\s*{/g, 'if $1:') // If statements
        .replace(/else\s*{/g, 'else:') // Else statements
        .replace(/else\s+if\s*\((.*?)\)\s*{/g, 'elif $1:') // Else if statements
        .replace(/return\s+(.+?);/g, 'return $1') // Return statements
        .replace(/int\s+/g, '') // Remove int keyword
        .replace(/String\s+/g, '') // Remove String keyword
        .replace(/boolean\s+/g, 'bool ') // Translate boolean type
        .replace(/(true|false)\s*;/g, '$1') // Boolean values
        .replace(/ArrayList<(\w+)>\s+(\w+)\s*=\s*new ArrayList<\1>\(\);/g, '$2 = []') // ArrayList to list
        .replace(/(\w+)\s+\[\]\s+(\w+)\s*=\s*new (\w+)\[\d+\];/g, '$2 = [$1 for _ in range(0)]') // Array declaration
        .replace(/this\.(\w+)\s*=\s*(.+?);/g, 'self.$1 = $2') // 'this' handling
        .replace(/(\w+)\s*\(\s*(.*?)\s*\)/g, 'def $1($2):') // Method declarations
        .replace(/new\s+(\w+)\s*\(\)/g, '$1()') // Object instantiation
        .replace(/(\w+)\s*\[(\d+)\]/g, '$1[$2]') // Array access
        .replace(/break;/g, 'break') // Break statement
        .replace(/continue;/g, 'continue') // Continue statement
        .replace(/switch\s*\((\w+)\)\s*{/g, 'switch_var = $1\n    match switch_var:\n') // Switch statement
        .replace(/case\s+(.+?):/g, '    case $1:') // Case statements
        .replace(/default:\s*{/g, '    default:') // Default case
        .replace(/try\s*{/g, 'try:\n    ') // Try block
        .replace(/catch\s*\((\w+)\s+(\w+)\)\s*{/g, 'except $1 as $2:\n    ') // Catch block
        .replace(/finally\s*{/g, 'finally:\n    '); // Finally block
}

// Event listener for button click
document.getElementById("translateBtn").addEventListener("click", function() {
    const javaInput = document.getElementById("javaInput").value;
    const pythonOutput = RaveVM(javaInput);
    document.getElementById("pythonOutput").textContent = pythonOutput;
});
