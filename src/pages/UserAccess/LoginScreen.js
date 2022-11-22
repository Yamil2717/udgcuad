import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Svg, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {AuthContext} from '../../contexts/AuthContext';
import {AxiosContext} from '../../contexts/AxiosContext';
import IconsAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {setGenericPassword} from 'react-native-keychain';

function LoginScreen({navigation}) {
  let [email, onChangeEmail] = useState('');
  let [password, onChangePassword] = useState('');

  let authContext = useContext(AuthContext);
  const {authAxios} = useContext(AxiosContext);

  async function Auth() {
    try {
      let response = await authAxios.post('/user/auth', {
        email,
        password,
      });
      let {accessToken, refreshToken, message} = response.data;
      alert(message);
      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });
      await setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || err.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/backgroundLogin.png')}
        resizeMode="cover"
        style={styles.background}>
        <ScrollView>
          <View style={styles.containerCenter}>
            <Svg
              viewBox="0 0 118 108"
              fill="none"
              style={styles.logo}
              xmlns="http://www.w3.org/2000/svg">
              <G clip-path="url(#clip0_147_53)">
                <Path
                  d="M46.0401 94.2223C46.0031 94.1769 45.9496 94.148 45.8913 94.1418C45.833 94.1356 45.7747 94.1527 45.7289 94.1893C45.547 94.3334 45.3634 94.4734 45.178 94.6091C43.3965 95.8895 41.3203 96.7015 39.1412 96.9702C38.0648 97.1025 36.9761 97.1025 35.8997 96.9702C33.721 96.7048 31.6447 95.8953 29.8628 94.6167C29.6775 94.481 29.4939 94.3411 29.3119 94.1969C29.2662 94.1603 29.2078 94.1432 29.1495 94.1494C29.0912 94.1556 29.0378 94.1846 29.0008 94.23L26.532 97.2832C26.4953 97.3288 26.4782 97.3871 26.4844 97.4452C26.4906 97.5034 26.5196 97.5567 26.5652 97.5936C29.6707 100.084 33.5358 101.442 37.5204 101.442C41.505 101.442 45.3701 100.084 48.4757 97.5936C48.5212 97.5567 48.5503 97.5034 48.5565 97.4452C48.5627 97.3871 48.5456 97.3288 48.5089 97.2832L46.0401 94.2223ZM23.2802 72.6259H18.9445C18.9016 72.6256 18.8595 72.638 18.8236 72.6615C18.7878 72.6851 18.7597 72.7187 18.7431 72.7582L12.1962 87.2381C12.1769 87.2848 12.1443 87.3247 12.1022 87.3528C12.0602 87.3809 12.0108 87.3959 11.9602 87.3959C11.9097 87.3959 11.8602 87.3809 11.8182 87.3528C11.7762 87.3247 11.7435 87.2848 11.7243 87.2381L5.26415 72.7506C5.24776 72.7109 5.21978 72.677 5.18384 72.6534C5.14791 72.6298 5.10568 72.6176 5.06266 72.6183H0.719316C0.682094 72.6176 0.645349 72.6267 0.612702 72.6445C0.580054 72.6624 0.552632 72.6884 0.533138 72.72C0.511931 72.7507 0.499329 72.7864 0.496638 72.8236C0.493947 72.8607 0.501267 72.8979 0.517836 72.9312L9.90079 93.828C9.91698 93.8676 9.94499 93.9013 9.98103 93.9245C10.0171 93.9477 10.0594 93.9593 10.1023 93.9577H13.7876C13.8308 93.9591 13.8733 93.9475 13.9097 93.9243C13.9462 93.9012 13.9747 93.8676 13.9916 93.828L23.4843 72.9389C23.5006 72.9054 23.5077 72.8683 23.5051 72.8312C23.5024 72.7941 23.4899 72.7584 23.469 72.7277C23.4493 72.6957 23.4214 72.6694 23.3883 72.6515C23.3552 72.6337 23.3179 72.6248 23.2802 72.6259ZM117.49 87.9378C117.403 86.6759 116.848 85.4917 115.931 84.6174C115.44 84.1138 114.856 83.708 114.212 83.4216L104.776 79.1674C104.616 79.1003 104.474 78.996 104.362 78.8632C104.25 78.7305 104.172 78.5731 104.133 78.4041C104.098 78.2415 104.098 78.0731 104.133 77.9105C104.181 77.6553 104.319 77.4255 104.521 77.2623C104.723 77.099 104.977 77.0132 105.238 77.02H116.276C116.335 77.02 116.391 76.9967 116.433 76.9552C116.474 76.9136 116.498 76.8573 116.498 76.7986V72.8549C116.498 72.8258 116.492 72.797 116.481 72.7702C116.47 72.7433 116.453 72.7189 116.433 72.6984C116.412 72.6778 116.388 72.6615 116.361 72.6504C116.334 72.6393 116.305 72.6335 116.276 72.6335H105.253C103.23 72.6335 101.325 73.8854 100.364 75.6359C100.128 76.0588 99.9564 76.5141 99.8537 76.9869C99.729 77.534 99.6801 78.0956 99.7083 78.656C99.7962 79.9175 100.352 81.1012 101.267 81.9764C101.757 82.4784 102.337 82.884 102.978 83.1722L112.414 87.4264C112.574 87.4944 112.715 87.599 112.827 87.7316C112.939 87.8642 113.018 88.0211 113.057 88.1897C113.092 88.3533 113.092 88.5222 113.057 88.6858C113.009 88.9408 112.872 89.1704 112.669 89.3331C112.467 89.4959 112.213 89.5813 111.953 89.5738H100.879C100.82 89.5745 100.764 89.598 100.723 89.6394C100.681 89.6807 100.658 89.7367 100.657 89.7952V93.7389C100.657 93.7976 100.68 93.8539 100.722 93.8954C100.764 93.937 100.82 93.9603 100.879 93.9603H111.943C113.968 93.9603 115.87 92.7085 116.832 90.9605C117.067 90.5375 117.239 90.0823 117.342 89.6094C117.466 89.0614 117.516 88.4991 117.49 87.9378ZM38.8862 72.3664C36.6618 72.0894 34.4057 72.4947 32.4178 73.5282C30.4299 74.5617 28.8046 76.1745 27.758 78.1521C26.7114 80.1296 26.2931 82.3782 26.5588 84.5988C26.8245 86.8193 27.7616 88.9065 29.2454 90.5827C30.7292 92.259 32.6894 93.4448 34.8652 93.9825C37.0411 94.5201 39.3295 94.3842 41.426 93.5927C43.5225 92.8012 45.3278 91.3917 46.6016 89.5516C47.8755 87.7115 48.5577 85.5281 48.5573 83.2918C48.5471 80.6105 47.5606 78.0243 45.7815 76.0144C44.0025 74.0046 41.552 72.7082 38.8862 72.3664ZM38.6311 89.8435C38.2679 89.9046 37.9002 89.9353 37.5319 89.9351C37.1646 89.9347 36.7978 89.905 36.4352 89.8461L36.3409 89.8283C34.7988 89.5481 33.4052 88.7343 32.4053 87.5301C31.4055 86.3258 30.8635 84.8083 30.8748 83.2446C30.886 81.6809 31.4499 80.1714 32.467 78.9816C33.4841 77.7918 34.8893 76.9981 36.4352 76.7401C37.1624 76.6214 37.904 76.6214 38.6311 76.7401L38.7178 76.7554C40.2601 77.0346 41.6541 77.8476 42.6546 79.0513C43.6552 80.255 44.198 81.7722 44.1877 83.3358C44.1773 84.8995 43.6144 86.4094 42.598 87.5997C41.5816 88.7901 40.1769 89.5846 38.6311 89.8435ZM86.941 72.2264C85.1256 72.2261 83.3382 72.6725 81.7371 73.526C80.1359 74.3796 78.7705 75.6139 77.7618 77.1196C76.7531 78.6254 76.1322 80.356 75.9542 82.1584C75.7762 83.9607 76.0464 85.779 76.7411 87.4522C77.4358 89.1254 78.5334 90.6019 79.9367 91.7508C81.34 92.8997 83.0057 93.6856 84.7862 94.0388C86.5667 94.3921 88.4071 94.3018 90.1442 93.7759C91.8814 93.25 93.4617 92.3049 94.7452 91.0241L95.2553 90.5152C95.2957 90.4731 95.3182 90.417 95.3182 90.3588C95.3182 90.3005 95.2957 90.2444 95.2553 90.2023L92.4703 87.4162C92.428 87.3759 92.3718 87.3534 92.3134 87.3534C92.255 87.3534 92.1988 87.3759 92.1566 87.4162L91.6465 87.9251C90.9291 88.6412 90.0566 89.1835 89.0961 89.5102L89.0349 89.5306C87.4357 90.0596 85.6952 89.9657 84.1625 89.2677C82.6299 88.5697 81.4185 87.3194 80.7715 85.7675V85.7395C80.1119 84.1282 80.1119 82.3231 80.7715 80.7118V80.6864C81.2014 79.6532 81.8857 78.7448 82.7609 78.0454C83.5676 77.4003 84.5137 76.9514 85.5243 76.7342C86.535 76.517 87.5825 76.5374 88.5838 76.7939C89.5852 77.0504 90.513 77.5358 91.2938 78.2119C92.0746 78.8879 92.6869 79.736 93.0824 80.689V80.7144C93.1257 80.8238 93.1665 80.9332 93.2073 81.0452H82.5874C82.0962 82.4601 82.0962 83.9988 82.5874 85.4138H97.5889C97.6432 85.4142 97.6958 85.3948 97.7367 85.3592C97.7776 85.3235 97.804 85.2742 97.8108 85.2204L97.8873 84.5945C98.0799 83.0465 97.9406 81.4752 97.4786 79.9849C97.0166 78.4946 96.2425 77.1192 95.2076 75.9499C94.1727 74.7805 92.9005 73.8439 91.4753 73.202C90.0502 72.5601 88.5046 72.2275 86.941 72.2264ZM62.9314 76.6638C63.8045 76.6594 64.6698 76.8271 65.4777 77.1572C66.2857 77.4873 67.0203 77.9733 67.6395 78.5873L68.1496 79.0962C68.1918 79.1365 68.248 79.1589 68.3064 79.1589C68.3649 79.1589 68.421 79.1365 68.4633 79.0962L71.2458 76.3178C71.2861 76.2756 71.3087 76.2196 71.3087 76.1613C71.3087 76.103 71.2861 76.0469 71.2458 76.0048L70.7357 75.4959C69.1923 73.9549 67.2253 72.9052 65.0837 72.4798C62.9421 72.0545 60.7221 72.2725 58.7048 73.1063C56.6875 73.9402 54.9634 75.3523 53.7509 77.1641C52.5384 78.9758 51.8919 81.1057 51.8933 83.2842C51.8923 84.7305 52.1771 86.1627 52.7315 87.4991C53.2859 88.8354 54.099 90.0496 55.1242 91.0721C56.1494 92.0947 57.3667 92.9056 58.7063 93.4583C60.046 94.0111 61.4817 94.2949 62.9314 94.2936C64.381 94.2955 65.8166 94.0117 67.1559 93.4585C68.4952 92.9052 69.7118 92.0935 70.7357 91.0699L71.2458 90.561C71.2861 90.5189 71.3087 90.4628 71.3087 90.4045C71.3087 90.3463 71.2861 90.2902 71.2458 90.2481L68.4607 87.4925C68.4191 87.4511 68.3627 87.4277 68.3039 87.4277C68.245 87.4277 68.1886 87.4511 68.147 87.4925L67.6369 88.0014C66.8626 88.7741 65.9092 89.3443 64.8612 89.6616C63.8132 89.9789 62.703 90.0334 61.6288 89.8203C60.5546 89.6072 59.5497 89.1331 58.7031 88.4399C57.8565 87.7468 57.1944 86.8561 56.7753 85.8466C56.3562 84.8372 56.1931 83.7402 56.3006 82.6529C56.408 81.5656 56.7826 80.5215 57.3911 79.6131C57.9997 78.7047 58.8234 77.9601 59.7894 77.4452C60.7553 76.9303 61.8337 76.661 62.9289 76.6612L62.9314 76.6638Z"
                  fill="#164578"
                />
                <Path
                  d="M34.4916 104.463C34.2987 104.284 34.0714 104.146 33.8234 104.056C33.2791 103.863 32.6845 103.863 32.1401 104.056C31.8922 104.146 31.6649 104.284 31.4719 104.463C31.2829 104.646 31.1344 104.866 31.0358 105.11C30.8251 105.654 30.8251 106.257 31.0358 106.802C31.1338 107.045 31.2824 107.266 31.4719 107.448C31.6657 107.624 31.8929 107.76 32.1401 107.847C32.6851 108.037 33.2785 108.037 33.8234 107.847C34.0715 107.757 34.2988 107.618 34.4916 107.438C34.6812 107.255 34.8298 107.035 34.9277 106.791C35.1385 106.247 35.1385 105.644 34.9277 105.099C34.8279 104.86 34.6795 104.643 34.4916 104.463ZM34.1091 106.458C34.0509 106.606 33.9643 106.741 33.854 106.855C33.7458 106.966 33.6154 107.052 33.4715 107.109C33.3097 107.175 33.1361 107.207 32.9614 107.204C32.7909 107.207 32.6216 107.175 32.464 107.109C32.3194 107.054 32.1888 106.967 32.0815 106.855C31.9705 106.741 31.8837 106.606 31.8264 106.458C31.7677 106.295 31.7392 106.123 31.7423 105.949C31.7399 105.776 31.7684 105.604 31.8264 105.44C31.8837 105.292 31.9705 105.157 32.0815 105.043C32.1896 104.933 32.32 104.846 32.464 104.789C32.622 104.725 32.791 104.693 32.9614 104.695C33.136 104.692 33.3094 104.724 33.4715 104.789C33.6148 104.847 33.745 104.934 33.854 105.043C33.9643 105.158 34.0509 105.293 34.1091 105.44C34.1672 105.604 34.1957 105.776 34.1932 105.949C34.1963 106.123 34.1678 106.295 34.1091 106.458ZM108.459 104.01V107.901H109.318V104.01H108.459ZM42.9666 104.453C42.7465 104.293 42.4969 104.178 42.2321 104.115C41.9407 104.044 41.6418 104.009 41.342 104.01H40.0668V107.901H41.4695C41.7517 107.903 42.0324 107.86 42.301 107.774C42.5557 107.695 42.7936 107.57 43.0023 107.405C43.2048 107.24 43.3692 107.033 43.4844 106.799C43.6072 106.539 43.6683 106.254 43.6629 105.967C43.6725 105.655 43.6088 105.345 43.4767 105.061C43.3589 104.82 43.1838 104.611 42.9666 104.453ZM42.6504 106.489C42.584 106.634 42.4823 106.761 42.3545 106.858C42.2221 106.954 42.0709 107.021 41.9108 107.056C41.7293 107.098 41.5436 107.119 41.3573 107.117H40.9136V104.794H41.4236C41.596 104.794 41.7676 104.817 41.9337 104.863C42.0876 104.904 42.2321 104.974 42.3596 105.069C42.4822 105.161 42.5817 105.28 42.6504 105.417C42.7264 105.576 42.7631 105.751 42.7575 105.926C42.7626 106.117 42.7261 106.306 42.6504 106.481V106.489ZM46.5015 106.326H48.1924V105.535H46.5015V104.794H48.2868V104.003H45.642V107.893H48.3913V107.109H46.5015V106.326ZM14.6418 104.018H13.7848V107.908H16.2358V107.109H14.6418V104.018ZM9.79601 106.326H11.4869V105.535H9.79601V104.794H11.5813V104.003H8.93652V107.893H11.6859V107.109H9.79601V106.326ZM90.3889 102.942H89.2668L88.7082 103.725H89.4351L90.3889 102.942ZM21.9844 106.321H23.6728V105.529H21.9819V104.794H23.7671V104.003H21.1224V107.893H23.8717V107.109H21.9819L21.9844 106.321ZM28.1896 107.102C28.0458 107.177 27.8852 107.215 27.7228 107.211C27.5731 107.213 27.4249 107.181 27.2893 107.117C27.1564 107.057 27.0374 106.971 26.9399 106.863C26.8381 106.746 26.7586 106.611 26.7052 106.466C26.6465 106.303 26.618 106.13 26.6211 105.957C26.6186 105.784 26.6471 105.611 26.7052 105.448C26.7596 105.303 26.84 105.168 26.9424 105.051C27.044 104.943 27.1663 104.857 27.302 104.797C27.4432 104.734 27.5963 104.702 27.7509 104.703C27.8973 104.7 28.0425 104.728 28.1768 104.786C28.2983 104.839 28.4052 104.92 28.488 105.023L29.1485 104.484C29.0676 104.38 28.9712 104.289 28.8629 104.214C28.7566 104.138 28.6408 104.077 28.5186 104.031C28.4046 103.987 28.2868 103.955 28.1666 103.934C28.0529 103.914 27.9377 103.904 27.8223 103.904C27.5352 103.901 27.25 103.95 26.9807 104.049C26.7327 104.138 26.5054 104.276 26.3125 104.456C26.1235 104.638 25.9749 104.859 25.8763 105.102C25.6656 105.646 25.6656 106.25 25.8763 106.794C25.9743 107.038 26.1229 107.258 26.3125 107.44C26.5078 107.62 26.7377 107.759 26.9883 107.847C27.2582 107.944 27.5432 107.993 27.8299 107.99C28.0996 107.989 28.3661 107.933 28.6129 107.824C28.8651 107.716 29.0822 107.54 29.2403 107.316L28.5186 106.791C28.4365 106.92 28.3234 107.026 28.1896 107.099V107.102ZM73.9337 106.321H75.6246V105.529H73.9337V104.794H75.719V104.003H73.0742V107.893H75.8235V107.109H73.9337V106.321ZM105.031 104.01H104.171V107.901H106.622V107.109H105.031V104.01ZM85.1937 105.893C85.3398 105.69 85.415 105.444 85.408 105.194C85.4144 104.997 85.3733 104.801 85.2881 104.624C85.2153 104.477 85.1054 104.353 84.9693 104.262C84.8279 104.168 84.6693 104.102 84.5026 104.069C84.3165 104.03 84.1267 104.01 83.9364 104.01H82.4291V107.901H83.2886V106.346H83.712L84.5255 107.901H85.5457L84.5536 106.257C84.8054 106.223 85.034 106.092 85.1912 105.893H85.1937ZM84.4465 105.435C84.4018 105.493 84.3417 105.537 84.273 105.563C84.1982 105.592 84.1189 105.609 84.0384 105.613H83.7834H83.2733V104.728H83.8344C83.9138 104.728 83.9931 104.734 84.0716 104.746C84.1462 104.754 84.2187 104.776 84.2858 104.809C84.348 104.84 84.4008 104.886 84.4388 104.944C84.4827 105.014 84.504 105.096 84.5 105.178C84.5109 105.268 84.4912 105.358 84.4439 105.435H84.4465ZM53.1045 104.769H54.219V107.901H55.076V104.769H56.1905V104.005H53.1045V104.769ZM90.774 104.463C90.5824 104.284 90.3559 104.145 90.1084 104.056C89.5631 103.863 88.9678 103.863 88.4226 104.056C88.1751 104.145 87.9485 104.284 87.7569 104.463C87.5671 104.646 87.4177 104.866 87.3182 105.11C87.1109 105.655 87.1109 106.257 87.3182 106.802C87.4171 107.046 87.5666 107.266 87.7569 107.448C87.9484 107.628 88.1749 107.768 88.4226 107.858C88.9683 108.048 89.5627 108.048 90.1084 107.858C90.356 107.768 90.5826 107.628 90.774 107.448C90.9652 107.266 91.1148 107.046 91.2127 106.802C91.4201 106.257 91.4201 105.655 91.2127 105.11C91.1142 104.866 90.9646 104.645 90.774 104.463ZM90.3915 106.458C90.3353 106.607 90.2484 106.742 90.1364 106.855C90.0282 106.966 89.8978 107.052 89.7539 107.109C89.5963 107.175 89.427 107.207 89.2566 107.204C89.0818 107.208 88.9081 107.176 88.7465 107.109C88.6025 107.052 88.4722 106.966 88.3639 106.855C88.2519 106.742 88.165 106.607 88.1089 106.458C88.0501 106.295 88.0216 106.123 88.0247 105.949C88.0223 105.776 88.0508 105.604 88.1089 105.44C88.165 105.292 88.2519 105.156 88.3639 105.043C88.473 104.934 88.6031 104.847 88.7465 104.789C88.9085 104.724 89.0819 104.692 89.2566 104.695C89.4269 104.693 89.5959 104.725 89.7539 104.789C89.8973 104.847 90.0274 104.934 90.1364 105.043C90.2484 105.156 90.3353 105.292 90.3915 105.44C90.4517 105.603 90.4811 105.776 90.4782 105.949C90.4818 106.123 90.4523 106.295 90.3915 106.458ZM101.58 104.463C101.388 104.285 101.161 104.146 100.914 104.056C100.369 103.863 99.7739 103.863 99.2286 104.056C98.9812 104.145 98.7546 104.284 98.563 104.463C98.3724 104.645 98.2229 104.866 98.1243 105.11C97.9136 105.654 97.9136 106.257 98.1243 106.802C98.2222 107.046 98.3719 107.266 98.563 107.448C98.7545 107.628 98.981 107.768 99.2286 107.858C99.7743 108.048 100.369 108.048 100.914 107.858C101.162 107.767 101.388 107.627 101.58 107.448C101.77 107.266 101.92 107.046 102.019 106.802C102.226 106.257 102.226 105.655 102.019 105.11C101.919 104.866 101.77 104.646 101.58 104.463ZM101.198 106.458C101.14 106.606 101.054 106.741 100.943 106.855C100.834 106.966 100.704 107.052 100.56 107.109C100.398 107.175 100.225 107.207 100.05 107.204C99.8794 107.207 99.7101 107.175 99.5526 107.109C99.4079 107.054 99.2773 106.967 99.17 106.855C99.058 106.742 98.9711 106.607 98.915 106.458C98.8541 106.295 98.8247 106.123 98.8282 105.949C98.8253 105.776 98.8547 105.603 98.915 105.44C98.9711 105.292 99.058 105.156 99.17 105.043C99.2782 104.933 99.4085 104.846 99.5526 104.789C99.7105 104.725 99.8795 104.693 100.05 104.695C100.224 104.692 100.398 104.724 100.56 104.789C100.703 104.847 100.833 104.934 100.943 105.043C101.054 105.157 101.14 105.292 101.198 105.44C101.256 105.604 101.284 105.776 101.282 105.949C101.287 106.122 101.261 106.295 101.205 106.458H101.198ZM60.4293 106.369C60.4308 106.483 60.4118 106.596 60.3732 106.702C60.3363 106.801 60.2809 106.892 60.2099 106.97C60.1389 107.046 60.0519 107.106 59.9549 107.145C59.856 107.188 59.7491 107.21 59.6412 107.209C59.5316 107.21 59.423 107.188 59.3224 107.145C59.2256 107.106 59.1386 107.046 59.0674 106.97C58.9964 106.892 58.941 106.801 58.9041 106.702C58.8655 106.596 58.8465 106.483 58.848 106.369V104.01H58.0013V106.402C57.9995 106.619 58.0349 106.834 58.1059 107.038C58.1722 107.231 58.2808 107.406 58.4238 107.551C58.5667 107.697 58.7404 107.808 58.9322 107.878C59.1612 107.963 59.4044 108.005 59.6489 108C59.8908 108.005 60.1315 107.963 60.3579 107.878C60.5496 107.808 60.7233 107.697 60.8663 107.551C61.0092 107.406 61.1179 107.231 61.1842 107.038C61.2552 106.834 61.2906 106.619 61.2888 106.402V104.01H60.4293V106.369ZM68.6748 106.55L67.7745 104.005H66.4763V107.896H67.3358V104.919L68.3228 107.901H68.9783L69.9984 104.919H70.0112V107.901H70.8681V104.01H69.5801L68.6748 106.55ZM77.5298 104.769H78.6417V107.901H79.5012V104.769H80.6132V104.005H77.5298V104.769ZM95.8213 104.26C95.6791 104.166 95.5195 104.102 95.352 104.072C95.163 104.034 94.9708 104.016 94.7782 104.016H93.3296V107.906H94.189V106.379H94.8292C95.0221 106.381 95.2146 106.362 95.403 106.321C95.5669 106.288 95.7223 106.222 95.8596 106.127C95.9907 106.032 96.0952 105.905 96.163 105.758C96.2407 105.579 96.2781 105.384 96.2727 105.188C96.2794 104.99 96.2383 104.793 96.1529 104.613C96.0751 104.467 95.9609 104.344 95.8213 104.255V104.26ZM95.3112 105.425C95.2784 105.484 95.2309 105.533 95.1735 105.568C95.1141 105.604 95.0484 105.629 94.9797 105.641C94.9067 105.657 94.8323 105.664 94.7578 105.664H94.1839V104.741H94.6252C94.7104 104.741 94.7956 104.746 94.8802 104.756C94.9632 104.763 95.0444 104.784 95.1199 104.82C95.1894 104.851 95.25 104.899 95.2959 104.96C95.345 105.029 95.3692 105.114 95.3648 105.199C95.3668 105.275 95.3502 105.351 95.3163 105.42L95.3112 105.425Z"
                  fill="#2A9DD8"
                />
                <Path
                  d="M65.2448 13.2332L43.9999 0.676798L42.8496 0L41.6994 0.676798L20.4519 13.2332L19.3374 13.8921V63.1864L22.6733 61.3875L35.4891 54.4618H66.3491V13.8921L65.2448 13.2332ZM61.8323 37.5012C58.1944 37.1866 54.7168 35.8648 51.7914 33.6846C48.4536 31.1938 45.98 27.7244 44.7165 23.7617C44.5613 23.2691 44.2163 22.8582 43.7573 22.6193C43.2984 22.3805 42.7632 22.3334 42.2694 22.4882C41.7756 22.6431 41.3637 22.9873 41.1244 23.4451C40.885 23.903 40.8377 24.4369 40.9929 24.9295C42.4175 29.4402 45.1642 33.4216 48.8787 36.36C52.5933 39.2983 57.1052 41.0588 61.8323 41.4144V49.9507H34.9229L33.8543 50.2229L23.8644 55.622V16.4569L42.8471 5.23882L61.8298 16.4569L61.8323 37.5012Z"
                  fill="#164578"
                />
                <Path
                  d="M97.5483 13.2332L76.3009 0.676798L75.1506 0L74.0029 0.676798L61.9497 7.80098L66.3849 10.4217L75.1506 5.23882L94.1359 16.4569V55.6169L84.1434 50.2178L83.0747 49.9456H68.9531V54.4618H82.5111L95.3397 61.3875L98.6552 63.1864V13.8921L97.5483 13.2332ZM86.2475 24.9372C86.3877 24.4492 86.3312 23.926 86.0903 23.4789C85.8493 23.0319 85.4428 22.6964 84.9574 22.5441C84.4721 22.3918 83.9463 22.4346 83.4922 22.6635C83.038 22.8924 82.6915 23.2892 82.5264 23.7693C81.2612 27.7318 78.7868 31.201 75.449 33.6923C73.4981 35.1405 71.2946 36.2146 68.9506 36.86V40.875C72.9754 39.9461 76.6877 37.986 79.7211 35.1883C82.7544 32.3906 85.0039 28.852 86.2475 24.9219V24.9372Z"
                  fill="#2A9DD8"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_147_53">
                  <Rect
                    width="117"
                    height="108"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </ClipPath>
              </Defs>
            </Svg>
          </View>
          <Text style={styles.textTitle}>Ingreso</Text>
          <View style={styles.subContainer}>
            <Text style={styles.textSubTitle}>Correo electrónico</Text>
            <View style={styles.formsStyle}>
              <IconsAwesome5
                name="user-alt"
                color="#2A9DD8"
                size={15}
                style={styles.iconForm}
              />
              <TextInput
                placeholder="voces@gmail.com"
                style={styles.inputLogin}
                value={email}
                onChangeText={onChangeEmail}
                textColor={styles.colorInput}
                theme={{
                  colors: {
                    placeholder: '#000000',
                    text: '#000000',
                    primary: '#000000',
                  },
                }}
                selectionColor="#000000"
                accessibilityIgnoresInvertColors={true}
              />
            </View>
            <Text style={styles.textSubTitle}>Contraseña</Text>
            <View style={styles.formsStyle}>
              <IconsAwesome5
                name="lock"
                color="#2A9DD8"
                size={15}
                style={styles.iconForm}
              />
              <TextInput
                placeholder="***********"
                secureTextEntry={true}
                style={styles.inputLogin}
                value={password}
                onChangeText={onChangePassword}
                textColor={styles.colorInput}
                theme={{
                  colors: {
                    placeholder: '#000000',
                    text: '#000000',
                    primary: '#000000',
                  },
                }}
                selectionColor="#000000"
                accessibilityIgnoresInvertColors={true}
              />
            </View>
          </View>
          <Text style={styles.textRef}>Olvidé mi contraseña</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="submit"
              style={styles.button2}
              onPress={() => Auth()}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    display: 'flex',
    marginTop: 50,
  },
  containerCenter: {
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    color: '#164578',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 22,
    marginVertical: 15,
  },
  subContainer: {
    marginHorizontal: 50,
  },
  iconForm: {
    width: 15,
    height: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 5,
    padding: 0,
  },
  formsStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 35,
    borderRadius: 24,
  },
  textSubTitle: {
    color: '#828282',
    fontSize: 18,
    marginVertical: 5,
  },
  inputLogin: {
    flex: 1,
    backgroundColor: 'white',
    fontSize: 14,
    height: 35,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 0,
  },
  textRef: {
    color: '#2A9DD8',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginVertical: 30,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  button1: {
    paddingHorizontal: 30,
    paddingVertical: 7.5,
    borderColor: '#2A9DD8',
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  },
  button2: {
    paddingHorizontal: 40,
    paddingVertical: 7.5,
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#2A9DD8',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  colorInput: {
    color: '#000000',
  },
});

export default LoginScreen;
