const axios = require('axios');

const makeSoleaspayPayment = async (paymentReference) => {
  try {
    const response = await axios.get(https://api.soleaspay.com/api/payment-status/${paymentReference}, {
      headers: {
        Authorization: 'Bearer -Jyd7tDv_aCi_eAU2FfSB5_KL7ZIe63RZqDgOSF7OLM'
      }
    });

    if (response.data.status === 'success') {
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Paiement non confirmé.' };
    }

  } catch (error) {
    return { success: false, message: 'Erreur API Soleaspay.', error: error.message };
  }
};

module.exports = { makeSoleaspayPayment };