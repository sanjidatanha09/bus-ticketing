/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary1: 'black',
      primary2: '#f7f7f7',  //white
      primary3: '#118e48',  //green
      primary4: '#fff',  //solid white
      primary5: '#B3C8CF',  //gray
      secondary1: 'black',
      cardBG: 'red',
      wtColor: '#00BF62',
      fbColor: '#004AAD',
    }
  },
  plugins: [require("daisyui")],

}

