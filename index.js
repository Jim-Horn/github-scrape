require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const token = process.env.GITHUB_TOKEN; // Use the token from the .env
const startDate = '2023-01-01'; // Adjust the start date as needed
const endDate = '2023-12-31'; // Replace with the current date
const perPage = 100; // Maximum results per page

let csvContent = 'Count,Merged Date,Repository,Title,URL,PR Number\n'; // CSV header
let count = 0;

function fetchPRs(page = 1) {
    axios.get(`https://api.github.com/search/issues`, {
        headers: {
            'Authorization': `token ${token}`
        },
        params: {
            q: `is:pr is:merged author:@me merged:${startDate}..${endDate}`,
            sort: 'created',
            order: 'asc',
            per_page: perPage,
            page: page
        }
    })
    .then(response => {
        response.data.items.forEach(pr => {
            const repoName = pr.repository_url.split('/').pop();
            const prNumber = pr.number;
            const title = pr.title.replace(/,/g, ''); // Remove commas from titles to maintain CSV format
            const mergedDate = new Date(pr.closed_at).toISOString().split('T')[0];
            const prUrl = pr.html_url;

            csvContent += `${++count},${mergedDate},${repoName},"${title}",${prUrl},${prNumber}\n`;
        });

        const linkHeader = response.headers.link;
        if (linkHeader && linkHeader.includes('rel="next"')) {
            fetchPRs(page + 1); // Fetch the next page
        } else {
            fs.writeFile('mergedPRs.csv', csvContent, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log('CSV file created successfully.');
                }
            });
        }
    })
    .catch(error => console.error(error));
}

fetchPRs(); // Initial call to the function
