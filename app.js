'use strict';

const fromSelected = document.querySelector("#from-select");
const toSelected = document.querySelector("#to-select");
const from = document.querySelector("#from-input");
const to = document.querySelector("#to-input");
const error = document.querySelector("#error");
const userInput = document.querySelector("#user-input");
const result = document.querySelector("#result")

let fromNS = "Decimal", toNS = "Decimal";

fromSelected.addEventListener("change", function () {
   fromNS = fromSelected.options[fromSelected.selectedIndex].text;
   userInput.innerText = "Enter the " + fromNS + " Number";
   from.focus();
   from.value = "";
   to.value = "";
});

toSelected.addEventListener("change", function () {
   toNS = toSelected.options[toSelected.selectedIndex].text;
   result.innerText = "Result (" + toNS + " Number)";
   from.focus();
   to.value = "";
});

from.addEventListener("input", function () {
   error.style.display = "none";
});

document.querySelector("#swap-button").addEventListener("click", function () {
   let temp = fromNS;
   fromNS = toNS;
   toNS = temp;
   
   userInput.innerText = "Enter the " + fromNS + " Number";
   result.innerText = "Result (" + toNS + " Number)";

   let fromIndex = fromSelected.selectedIndex;
   fromSelected.selectedIndex = toSelected.selectedIndex;
   toSelected.selectedIndex = fromIndex;
});

document.querySelector("#reset-button").addEventListener("click",function () {
   fromNS = "Decimal";
   toNS = "Decimal";

   userInput.innerText = "Enter the " + fromNS + " Number";
   result.innerText = "Expected Output (" + toNS + " Number)";

   fromSelected.selectedIndex = 0;
   toSelected.selectedIndex = 0;

   from.value = "";
   to.value = "";
   error.style.display = "none";
})

let fromValue;
document.querySelector("#convert-button").addEventListener("click", function () {
   if(from.value===""){
      error.style.display = "inherit";
      error.innerText = "Enter " + fromNS + " Number";
   }
   switch (fromNS) {
      case "Binary":
         fromValue = from.value;
         if (/^[01]*$/.test(fromValue)) {
            switch (toNS) {
               case "Decimal": to.value = parseInt(fromValue, 2);
                  break;
               case "Hexadecimal": to.value = parseInt(fromValue, 2).toString(16).toUpperCase();
                  break;
               case "Octal": to.value = parseInt(fromValue, 2).toString(8);
                  break;
               default: to.value = fromValue;
            }
         } else {
            error.style.display = "inherit";
            error.innerText = "Invalid " + fromNS + " Number";
            to.value = "";
         }
         break;

      case "Decimal":
         fromValue = from.value;
         if (/^[0-9]*$/.test(fromValue)) {
            switch (toNS) {
               case "Binary": to.value = Math.abs(fromValue).toString(2);
                  break;
               case "Hexadecimal": to.value = Math.abs(fromValue).toString(16).toUpperCase();
                  break;
               case "Octal": to.value = Math.abs(fromValue).toString(8);
                  break;
               default: to.value = fromValue;
            }
         } else {
            error.style.display = "inherit";
            error.innerText = "Invalid " + fromNS + " Number";
            to.value = "";
         }
         break;

      case "Hexadecimal":
         fromValue = from.value;
         if (/^[0-9a-fA-F]*$/.test(fromValue)) {
            switch (toNS) {
               case "Binary": to.value = parseInt(fromValue, 16).toString(2);
                  break;
               case "Decimal": to.value = parseInt(fromValue, 16);
                  break;
               case "Octal": to.value = parseInt(fromValue, 16).toString(8);
                  break;
               default: to.value = fromValue;
            }
         } else {
            error.style.display = "inherit";
            error.innerText = "Invalid " + fromNS + " Number";
            to.value = "";
         }
         break;

      case "Octal":
         fromValue = from.value;
         if (/^[0-7]*$/.test(fromValue)) {
            switch (toNS) {
               case "Binary": to.value = parseInt(fromValue, 8).toString(2);
                  break;
               case "Decimal": to.value = parseInt(fromValue, 8);
                  break;
               case "Hexadecimal": to.value = parseInt(fromValue, 8).toString(16).toUpperCase();
                  break;
               default: to.value = fromValue;
            }
         } else {
            error.style.display = "inherit";
            error.innerText = "Invalid " + fromNS + " Number";
            to.value = "";
         }
         break;
   }
});