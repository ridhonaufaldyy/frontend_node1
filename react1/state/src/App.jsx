import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(1) // Mulai dari ID 1
  const [data, setData] = useState({}) // Inisialisasi sebagai objek kosong untuk menyimpan satu produk
  const [kucing, setKucing] = useState("")
  function nextPage() {
    setCount(count + 1)
  }

  function prevPage() {
    if (count > 1) { // Batas minimum 1 agar tidak keluar dari ID produk
      setCount(count - 1)
    }
  }

  useEffect(() => {
    // Fetch data kucing berdasarkan ID yang di-update melalui count
    fetch(`https://api.thecatapi.com/v1/images/search?api_key=${count}`) // Ganti YOUR_API_KEY dengan kunci API yang valid
      .then((res) => res.json())
      .then((dataKucing) => {
        // Mengambil gambar kucing dari array hasil fetch
        setKucing(dataKucing[count]); // Ambil objek pertama dari array
      })
      .catch((error) => console.error("Error fetching cat data:", error));
  }, [count]);

  useEffect(() => {
    // Fetch data produk berdasarkan ID yang di-update melalui count
    fetch(`https://dummyjson.com/products/${count}`)
      .then((res) => res.json())
      .then((produk) => {
        setData(produk) // Simpan produk langsung ke state data
      })
      .catch((error) => console.error("Error fetching data:", error))
  }, [count]) // Memanggil useEffect setiap kali count berubah

  return (
    <>
      <main>
        <header>
          <p>Product ID: {count}</p>
          <button onClick={nextPage}>Next Product</button>
          <button onClick={prevPage}>Previous Product</button>
        </header>

        <section>

            <div>
              <h2>{data.title}</h2>
              <img src={data.thumbnail} alt={data.title} width="100" />
              <p>Price: ${data.price}</p>
              <p>{data.description}</p>
            </div>

                {/* PR */}
      {/* <p>{kucing.id}</p> */}

          
        </section>
      </main>
    </>
  )
}

export default App
