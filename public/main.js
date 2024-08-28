const sortButton = document.getElementById("sort-button");
const messagesList = document.querySelector(".messages-list");
const sortStatus = document.querySelector(".sort-status");
let ascending = true; // Initialize ascending to true

const sortMessages = () => {
  const messages = [...messagesList.querySelectorAll("li")]; // Get all message list items

  messages.sort((a, b) => {
    const userA = a.querySelector(".username").textContent.toLowerCase();
    const userB = b.querySelector(".username").textContent.toLowerCase();
    return ascending ? userA.localeCompare(userB) : userB.localeCompare(userA);
  });

  return messages; // Return the sorted messages array
};

const renderNewList = (sortedMessages) => {
  messagesList.innerHTML = ""; // Clear the existing list

  sortedMessages.forEach((message) => {
    messagesList.appendChild(message); // Append each sorted message
  });
};

sortButton.addEventListener("click", () => {
  const sortedMessages = sortMessages(); // Get sorted messages
  renderNewList(sortedMessages); // Render the sorted messages

  sortStatus.innerText = ascending ? "Sorted by: asc" : "Sorted by: desc";

  ascending = !ascending; // Toggle the sort order
  console.log("Sort order is now:", ascending ? "Ascending" : "Descending");
});
