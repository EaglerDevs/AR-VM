// Basic console log and alert for debugging
alert("You EaglerPatrol folks will NEVER catch me lacking");

// Main translation function
function ARVM(pythonCode) {
    const lines = pythonCode.split('\n');
    let javaScriptCode = '';
    let indentationLevel = 0;

    lines.forEach(line => {
        const trimmedLine = line.trim();

        // Adjust indentation for colons
        if (trimmedLine.endsWith(':')) {
            javaScriptCode += '    '.repeat(indentationLevel) + trimmedLine.slice(0, -1) + ' {' + '\n';
            indentationLevel++;
        } else if (trimmedLine === '}') {
            indentationLevel--;
            javaScriptCode += '    '.repeat(indentationLevel) + '}' + '\n';
        } else {
            let translatedLine = translateLine(trimmedLine);
            javaScriptCode += '    '.repeat(indentationLevel) + translatedLine + '\n';
        }
    });

    return javaScriptCode.trim(); // Return trimmed code
}

// Line translation logic
function translateLine(line) {
    return line
        .replace(/def\s+(\w+)\((.*?)\):/g, 'function $1($2)') // Function declaration
        .replace(/print\((.+?)\)/g, 'console.log($1)') // Print statements
        .replace(/([a-zA-Z_]\w*)\s*=\s*([^;]+)/g, '$1 = $2') // Variable assignments
        .replace(/if\s+(.*?):/g, 'if ($1) {') // If statements
        .replace(/else:/g, 'else {') // Else statements
        .replace(/elif\s+(.*?):/g, 'else if ($1) {') // Else if statements
        .replace(/while\s+(.*?):/g, 'while ($1) {') // While loops
        .replace(/for\s+(\w+)\s+in\s+(\w+):/g, 'for (let $1 of $2) {') // For loops
        .replace(/return\s+(.*?)/g, 'return $1;') // Return statements
        .replace(/True/g, 'true') // Boolean values
        .replace(/False/g, 'false') // Boolean values
        .replace(/None/g, 'null') // None to null
        .replace(/([a-zA-Z_]\w*)\s*=\s*\[\]/g, '$1 = [];') // List initialization
        .replace(/([a-zA-Z_]\w*)\s*=\s*range\((.*?)\)/g, '$1 = Array.from({ length: $2 }, (_, i) => i);') // Range to array
        .replace(/(self\.(\w+))\s*=\s*(.+)/g, '$2 = $3') // Handling 'self'
        .replace(/(\w+)\[(\d+)\]/g, '$1[$2]') // Array access
        .replace(/break/g, 'break;') // Break statement
        .replace(/continue/g, 'continue;') // Continue statement
        .replace(/try:/g, 'try {') // Try block
        .replace(/except\s+(\w+)\s+as\s+(\w+):/g, 'catch ($2) {') // Catch block
        .replace(/finally:/g, 'finally {') // Finally block
        .replace(/class\s+(\w+):/g, 'class $1 {') // Class declaration
        .replace(/@(\w+)/g, '/* decorator $1 */') // Decorators
        .replace(/with\s+(.*?)\s+as\s+(\w+):/g, '/* with statement */') // With statement
        .replace(/([a-zA-Z_]\w*)\s*=\s*\{(.*?)\}/g, '$1 = {$2}') // Dictionary initialization
        .replace(/for\s+(\w+)\s+in\s+(\w+)\s*:\s*(.*)/g, 'for (let $1 of $2) {$3') // For loop with else
        .replace(/(\w+)\s*\+\=\s*(.+)/g, '$1 += $2;') // Augmented assignments
        .replace(/(\w+)\s*-\=\s*(.+)/g, '$1 -= $2;') // Augmented assignments
        .replace(/(\w+)\s*\*\=\s*(.+)/g, '$1 *= $2;') // Augmented assignments
        .replace(/(\w+)\s*\/=\s*(.+)/g, '$1 /= $2;') // Augmented assignments
        .replace(/if\s+(.*?):\s*(.*)/g, 'if ($1) {$2') // Inline if statements
        .replace(/(\w+)\s*\.\s*(\w+)\((.*?)\)/g, '$1.$2($3)'); // Method calls
}

// Event listener for button click
document.getElementById("translateBtn").addEventListener("click", function() {
    const pythonInput = document.getElementById("pythonInput").value;
    const javaScriptOutput = ARVM(pythonInput);
    document.getElementById("javaScriptOutput").textContent = javaScriptOutput;
});
