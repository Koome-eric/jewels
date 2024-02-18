import Image from "next/image";
import styles from "./transactions.module.css";

// Sample data
const transactionData = [
  {
    Date: "2024-02-16",
    Name: "Shalom Tenenbaum",
    Amount: "$25,000.00",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": 5897,
  },
  {
    Date: "2024-02-16",
    Name: "Shalom Tenenbaum",
    Amount: "$25,000.00",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": 8457,
  },
  {
    Date: "2024-02-16",
    Name: "Matthew Schoenfeld",
    Amount: "$1,000.00",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": 6489,
  },
  {
    Date: "2024-02-15",
    Name: "Howard Tzvi Schwartz",
    Amount: "$600.00",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": 9283,
  },
];

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Fund</td>
            <td>Amount</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image
                    src="/noavatar.png"
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {transaction.Name}
                </div>
              </td>
              <td>
                <span className={`${styles.status} ${styles.done}`}>
              {transaction.Fund}
              </span>
              </td>
              <td>{transaction.Amount}</td>
              
              <td>{transaction.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
