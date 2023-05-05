import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Papa from 'papaparse';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { format } = req.query;
  const apiResponse = await axios.get<ApiResult>(
    'https://randomuser.me/api/?results=100'
  );

  // Convert response to JSON
  const data = apiResponse.data.results;

  // Convert to CSV if format is CSV
  if (format === 'csv') {
    const cleanData = data.map((user) => {
      return {
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
      };
    });
    const csv = Papa.unparse(cleanData);
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } else {
    // Return JSON by default
    res.json(data);
  }
}
