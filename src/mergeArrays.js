const array1 = [];
const array2 = [];

function mergeArrays(arr1, arr2) {
  return arr1.concat(arr2).sort((a, b) => a - b);
}

let input1 = document.getElementById("array1");
let input2 = document.getElementById("array2");
let result = document.getElementById("result");
let addButton1 = document.getElementById("addData1");
let addButton2 = document.getElementById("addData2");

addButton1.addEventListener("click", function () {
  let value = parseInt(input1.value);
  console.log("Input 1 Value:", value);
  if (!isNaN(value) && array1.length < 5) {
    array1.push(value);
    input1.value = "";
    console.log("Array 1:", array1);
    updateResult();
  }
});

addButton2.addEventListener("click", function () {
  let value = parseInt(input2.value);
  if (!isNaN(value) && array2.length < 5) {
    array2.push(value);
    input2.value = "";
    console.log("Array 2:", array2);
    updateResult();
  }
});

function updateResult() {
  let mergedArray = mergeArrays(array1, array2);
  console.log("Merged and Sorted Array:", mergedArray);
  result.innerText = "Array combinado: " + mergedArray.join(", ");
}

// Initial display
updateResult();
