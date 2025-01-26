import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif'], // เพิ่ม Google Font Prompt
      },
      colors: {
        'primary': '#007bff', // ตัวอย่างสีหลัก
        'secondary': '#6c757d', // ตัวอย่างสีรอง
        'background': '#f8f9fa', // สีพื้นหลัง
        'text': '#212529', // สีตัวอักษร
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}