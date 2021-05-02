const prod = {
  API_URL: "https://a1grs7c631.execute-api.eu-north-1.amazonaws.com"
};

const dev = {
  API_URL: "http://localhost:4000"
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
