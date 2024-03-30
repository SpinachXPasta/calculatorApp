function compute(root) {
    if (root.value != null) {
      return root.value;
    }
  
    if (root.operation) {
      let left = compute(root.left);
      let right = compute(root.right);
  
      switch (root.operation) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return Math.floor(left / right);
      }
    }
  }

function calcEval(s) {
    let root = {};
    let currentNode = root;
  
    for (let i = 0, length = s.length; i < length; i++) {
        let char = s.charAt(i);
        if (/[0-9]/.test(char)) {
          let number = char;
          while (/[0-9]/.test(s[i + 1])) {
            char = s[i + 1];
            number += char;
            i = i + 1;
          }
          if (currentNode.left == null) {
            currentNode.left = { value: parseInt(number, 10) };
          } else if (currentNode.right == null) {
            currentNode.right = { value: parseInt(number, 10) };
          }
        }
        if (["+", "-", "*", "/"].includes(char)) {
            if (currentNode.operation == null) {
              currentNode.operation = char;
            } else {
              const newNode = { operation: char };
              if (
                ["+", "-"].includes(currentNode.operation) &&
                ["*", "/"].includes(newNode.operation)
              ) {
                newNode.left = { ...currentNode.right };
                currentNode.right = newNode;
                newNode.parent = currentNode;
              } else if (
                ["*", "/"].includes(currentNode.operation) &&
                ["*", "/"].includes(newNode.operation)
              ) {
                if (!currentNode.parent) {
                  newNode.left = currentNode;
                  currentNode.parent = newNode;
                  root = newNode;
                } else {
                  currentNode.parent.right = newNode;
                  newNode.parent = currentNode.parent;
                  newNode.left = currentNode;
                }
              } else {
                newNode.left = root;
                root.parent = newNode;
                root = newNode;
              }
              currentNode = newNode;
            }
          }
    }
  
    if (!root.operation) {
      return root.left.value;
    }
  
    return compute(root); 
}

