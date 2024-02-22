import Image from "next/image";
import styles from "./transactions.module.css";

// Sample data
const transactionData = [
  {
    Date: "22/02/2024",
    Name: "Mordechai Bamberger",
    Amount: "$200",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": null,
  },
  {
    Date: "22/02/2024",
    Name: "Esther Berman",
    Amount: "$36",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": null,
  },
  {
    Date: "22/02/2024",
    Name: "Chuck Lowenstein",
    Amount: "$250",
    Type: "Payment for invoice 000005",
    Fund: "JEWELS SCHOOL",
    Campaign: null,
    "Account Number": null,
  },
  {
    Date: "21/02/2024",
    Name: "Gavriel Steele",
    Amount: "$18",
    Type: "Donation",
    Fund: "JEWELS SCHOOL",
    Campaign: "Donation",
    "Account Number": null,
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
