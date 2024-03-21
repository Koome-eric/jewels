import { updateProduct } from "app/lib/actions";
import { fetchProduct, fetchDonationsForContactByName, getTotalDonatedAmount } from "app/lib/data";
import styles from "app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  const donations = await fetchDonationsForContactByName(product.name); // Fetch donations for this contact by name
  const totalDonatedAmount = await getTotalDonatedAmount(product.name); // Get total donated amount for this contact

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" width={60} height={60} />
        </div>
        <h1>{product.name}</h1> {/* Display the contact's name */}
        <div className={styles.productInfo}>
        <h2>Total Donated: <span>${totalDonatedAmount.toFixed(2)}</span></h2>
      </div>
      </div>
      
      <div className={styles.donationsContainer}>
        <h2>Donations</h2>
        <table className={styles.donationsTable}>
          <thead>
            <tr>
              <th>Fund</th>
              <th>Amount</th>
              <th>Campaign</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.Fund}</td>
                <td>{donation.Amount}</td>
                <td>{donation.Campaign}</td>
                <td>{donation.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleProductPage;
