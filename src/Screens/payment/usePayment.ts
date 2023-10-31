import { Images } from '@/Assets';
import { COLORS } from '@/Configration';
import RazorpayCheckout from 'react-native-razorpay'
export const usePayment = () =>{

    const startPayment = () => {
        var options = {
          description: 'Credits towards consultation',
          image: Images.gradientLogo,
          currency: 'INR',
          key: 'rzp_test_1DP5mmOlF5G5ag', // Your api key
          amount: '5000',
          name: 'Raavila',
          prefill: {
            email: 'void@razorpay.com',
            contact: '9191919191',
            name: 'Raavilla',
          },
          theme: {color: COLORS.MAIN},
        };
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          })
          .catch(error => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
      }
      return {startPayment}
}