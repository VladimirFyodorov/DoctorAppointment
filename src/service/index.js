class Service {
  async getAdressSuggestions(adress) {
    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: "Token be392e4d2e8c5e87cbb17efa42ce92dc6bd73b53",
      },
      body: JSON.stringify({ query: adress }),
    });

    if (!response.ok) {
      const msg = `Could not fetch from ${url}, received ${response.status}`;
      return new Error(msg);
    }

    return await response.json();
  }
}

export default Service;
