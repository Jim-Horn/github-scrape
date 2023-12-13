# GitHub Pull Request Fetcher

## Introduction
This Node.js script fetches all merged pull requests authored by you within a specified date range and outputs the details in a CSV file. It's a useful tool for tracking your contributions across various GitHub repositories.

## Prerequisites
- Node.js installed on your system.
- A GitHub Personal Access Token with `repo` scope for private repository access. [How to create a token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Setup
1. **Clone the Repository**: Clone or download this repository to your local machine.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install the required dependencies.
3. **Environment Variables**: 
   - Create a `.env` file in the root of the project.
   - Add your GitHub token to the `.env` file as follows:
     ```
     GITHUB_TOKEN=your_github_personal_access_token
     ```

## Usage
- Open the `fetchPRs.js` file.
- Set the `startDate` and `endDate` variables to the desired date range for fetching pull requests.
- Run the script using the command:
  ```
  node fetchPRs.js
  ```
- Once executed, the script will create a file named `mergedPRs.csv` in the project directory, containing the fetched pull request data.

## CSV File Format
The generated CSV file will have the following columns:
- Count: A sequential count of pull requests.
- Repository: The name of the repository.
- PR Number: The pull request number.
- Merged Date: The date when the pull request was merged.
- Title: The title of the pull request.
- URL: The URL of the pull request.

## Security Note
Ensure that your `.env` file is never committed to version control and always keep your personal access tokens secure and confidential.