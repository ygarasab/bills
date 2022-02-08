const arraySum = array =>
{
    return array
        .map(c => parseInt(c))
        .reduce((a,b) => a + b, 0)
}

export 
{
    arraySum
}
