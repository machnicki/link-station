export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        station: [0, 0, 1],
        power: 1
      },
      null,
      2
    )
  };
};
