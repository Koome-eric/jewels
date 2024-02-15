import Image from "next/image";
import Link from "next/link";
import styles from "app/ui/dashboard/donations/donations.module.css"; // Update the import path
import Search from "app/ui/dashboard/search/search";
import Pagination from "app/ui/dashboard/pagination/pagination";
import { fetchDonations } from "app/lib/data"; // Update the import path
import { deleteDonation } from "app/lib/actions";


const DonationsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, donations } = await fetchDonations(q, page); // Update the function name

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a donor..." />
        <Link href="">
            <button className={styles.addButton}>Export</button>
          </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Fund</td>
            <td>Amount</td>
            <td>Campaign</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => ( 
            <tr key={donation._id}> 
              <td>
                <div className={styles.donation}> 
                  <Image
                    src={donation.img || "/noavatar.png"} 
                    alt=""
                    width={40}
                    height={40}
                    className={styles.donationImage} 
                  />
                  {donation.Name}
                </div>
              </td>
              <td>
              <span className={`${styles.status} ${styles.school}`}>
              {donation.Fund}
              </span>
            </td>
            
              <td>{donation.Amount}</td>
              <td>{donation.Campaign}</td>                           
              <td>{donation.Date}</td>
              <td>
                <div className={styles.buttons}>
                  <form action={deleteDonation}>
                    <input type="hidden" name="id" value={donation._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default DonationsPage; // Update component name
