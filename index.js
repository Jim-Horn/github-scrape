require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const token = process.env.GITHUB_TOKEN;
const startDate = '2023-01-01';
const endDate = '2023-12-31';
const perPage = 100;

// const author = 'edfbarker';
const author = '@me';

let csvContent = 'Count,Merged Date,Repository,Title,URL\n'; 
let count = 0;

function fetchPRs(page = 1) {
    axios.get(`https://api.github.com/search/issues`, {
        headers: {
            'Authorization': `token ${token}`
        },
        params: {
            q: `is:pr is:merged author:${author} merged:${startDate}..${endDate}`,
            sort: 'created',
            order: 'asc',
            per_page: perPage,
            page: page
        }
    })
    .then(response => {
        response.data.items.forEach(pr => {

            if(count ===1){console.log(pr);}
            const repoName = pr.repository_url.split('/').pop();
            const title = pr.title.replace(/,/g, '');
            const mergedDate = new Date(pr.pull_request.merged_at).toISOString().split('T')[0];
            const prUrl = pr.html_url;

            csvContent += `${++count},${mergedDate},${repoName},"${title}",${prUrl}\n`;
        });

        const linkHeader = response.headers.link;
        if (linkHeader && linkHeader.includes('rel="next"')) {
            fetchPRs(page + 1);
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

fetchPRs();
