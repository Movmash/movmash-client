let URL = "";

if (process.env.NODE_ENV === "development") {
  URL = "http://localhost:8000";
}

export default URL;