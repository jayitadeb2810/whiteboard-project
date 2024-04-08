import React, { useState } from "react"

function ImageUpload() {
  const [image, setImage] = useState<
    string | null
  >(null)
  const [predictions, setPredictions] = useState<
    { label: string; confidence: number }[]
  >([])

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = () => {
    if (image) {
      // Send image to backend for prediction
      const formData = new FormData()
      formData.append("image", image)
      fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) =>
          setPredictions(data.predictions)
        )
        .catch((error) =>
          console.error("Error:", error)
        )
    }
  }

  return (
    <div className="App">
      <h1>Image Classification App</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>
        Upload
      </button>
      {image && (
        <div className="Preview">
          <img
            src={image}
            alt="Preview"
          />
        </div>
      )}
      {predictions.length > 0 && (
        <div className="Predictions">
          <h2>Predictions:</h2>
          <ul>
            {predictions.map(
              (prediction, index) => (
                <li key={index}>
                  {prediction.label}:{" "}
                  {prediction.confidence.toFixed(
                    2
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
