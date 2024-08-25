import tinycolor from "tinycolor2";

const formatDateLong = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: '2-digit' };

  return date.toLocaleDateString('en-US', options).replace(', ', '-');
};

const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'numeric', day: '2-digit' };

  return date.toLocaleDateString('en-US', options).replace(', ', '-');
};

const capitalizeWords = (s) => {
  return s.replace(/\b\w/g, (char) => char.toUpperCase());
};

const generateMonochromePalette = (baseColor, numOfShades) => {
  const color = tinycolor(baseColor);
  const palette = [];

  for(let i = 0; i < numOfShades; i++){
    const shade = color.clone().lighten(((i + 1) / numOfShades) * 40).toString();
    palette.push(shade);
  }

  return palette;
}

const balanceDataBuilder = (transactions, currAmount) => {
  let recentTransactions = transactions;

  if (transactions.length > 8) {
    recentTransactions = transactions.slice(0, 8);
  }

  const labels = [''];
  const data = [currAmount];

  let runningTotal = currAmount;
  const reversedTransactions = [...recentTransactions].reverse();

  if (reversedTransactions.length > 5) {
    reversedTransactions.forEach((transaction) => {
      labels.push(formatDateShort(transaction.date));
    });
  } else {
    reversedTransactions.forEach((transaction) => {
      labels.push(formatDateLong(transaction.date));
    });
  }

  recentTransactions.forEach((transaction) => {
    if (transaction.type === 'Income') {
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
    if (transaction.type === 'Expense') {
      const { category, amount } = transaction;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + amount);
      } else {
        categoryMap.set(category, amount);
      }
    }
  });

  // Convert map to array and sort by amount in descending order
  const sortedCategories = [...categoryMap.entries()].sort(
    (a, b) => b[1] - a[1]
  );

  // Take only the top 5 categories if there are more than 5
  const topCategories = sortedCategories.slice(0, 5);

  const baseColor = "#416788";
  const colors = generateMonochromePalette(baseColor, 5);

  const data = [];
  let colorIndex = 0;

  topCategories.forEach(([category, amount]) => {
    data.push({
      name: capitalizeWords(category),
      amount: amount,
      color: colors[colorIndex],
      legendFontColor: '#080E21',
    });

    colorIndex++;
  });

  return data;
};

export { balanceDataBuilder, categoryDataBuilder };
