const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit" };

  return date.toLocaleDateString("en-US", options).replace(", ", "-");
};

const balanceDataBuilder = (transactions, currAmount) => {
  const labels = [""];
  const data = [currAmount];

  let runningTotal = currAmount;
  const reversedTransactions = [...transactions].reverse();

  reversedTransactions.forEach((transaction) => {
    labels.push(formatDate(transaction.date));
  });

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      runningTotal -= transaction.amount;
    } else {
      runningTotal += transaction.amount;
    }

    data.unshift(runningTotal);
  });

  return {
    labels,
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(65, 103, 136, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

export { balanceDataBuilder };
