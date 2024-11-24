function forceDownload(blobUrl: string, filename: string) {
    let a: any = document.createElement('a')
    a.download = filename
    a.href = blobUrl
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  
  export default function downloadPhoto(url: string, filename: string) {
    fetch(url, {
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob)
        console.log('force downloading:', blobUrl, filename)
        forceDownload(blobUrl, filename)
      })
      .catch((e) => console.error(e))
  }