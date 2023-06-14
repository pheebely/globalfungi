const { csv } = d3; //same as const csv = d3.csv

const csvdata = "./globalfungi_merged.csv";

csv(csvdata).then(data => {
    console.log(data); //'.then' is used for asynchronous control flow, run REQUEST to resolve for PROMISE --data comes back
});