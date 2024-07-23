const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "2-digit" };

  return date.toLocaleDateString("en-US", options).replace(", ", "-");
};

const capitalizeWords = (s) => {
  return s.replace(/\b\w/g, (char) => char.toUpperCase());
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

const categoryDataBuilder = (transactions) => {
  const categoryMap = new Map();

  transactions.forEach((transaction) => {
    if (transaction.type === "Expense") {
      const { category, amount } = transaction;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        categoryMap.set(category, amount);
      }
    }
  });

  const data = [];
  const colors = ["#416788", "#FE616F", "#62A87C", "#E6F14A", "#FFB100"];
  let colorIndex = 0;

  categoryMap.forEach((amount, category) => {
    data.push({
      name: capitalizeWords(category),
      amount: amount,
      color: colors[colorIndex % colors.length],
      legendFontColor: "#080E21",
    });

    colorIndex++;
  });

  return data;
};

export { balanceDataBuilder, categoryDataBuilder };
