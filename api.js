const API = "https://apigroceries-back-port.up.railway.app/";

export const getAllG = async () => {
  const res = await fetch(`${API}getAll`);
  return await res.json();
};

export const getProduct = async (barcode) => {
  const res = await fetch(`${API}getOne/${barcode}`);
  return await res.json();
};

export const saveProduct = async (newProduct) => {
  const res = await fetch(`${API}insert`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  return await res.json();
};

export const deleteProduct = async (barcode) => {
  await fetch(`${API}delete/${barcode}`, {
    method: "DELETE",
  });
};

export const updateProduct = async (barcode, newProduct) => {
  const res = await fetch(`${API}update/${barcode}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return res;
};
