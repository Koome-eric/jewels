"use client"

// components/Dashboard.jsx (Adjust the path as necessary)
import styles from "../ui/dashboard/dashboard.module.css"; // Adjust path as necessary
import Card from "../ui/dashboard/card/card"; // Adjust path as necessary
import Transactions from "../ui/dashboard/transactions/transactions"; // Adjust path as necessary
import Chart from "../ui/dashboard/chart/chart"; // Adjust path as necessary
import Rightbar from "../ui/dashboard/rightbar/rightbar"; // Adjust path as necessary

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card 
            title="Total Users" 
            number="2" // Use the totalCount prop here
            detail={{ percentage: "4%", text: "than previous week" }}
            icon="users"
          />
          <Card 
            title="Total Donations" 
            number="$7,753,813.99" 
            detail={{ percentage: "10%", text: "increase from last month" }}
            icon="donations"
          />
          <Card 
            title="Total Constituents" 
            number="5567" 
            detail={{ percentage: "2%", text: "more than last week" }}
            icon="contacts"
          />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
