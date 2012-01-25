// 280 ms for 5555 primes

let time f v = 
    let watch = new System.Diagnostics.Stopwatch()
    watch.Start()
    let result = f v
    watch.Stop()
    printfn "Elapsed time: %f ms" (watch.Elapsed.TotalMilliseconds)
    result

let isPrime x primes = 
    false = List.exists (fun p -> x % p = 0) primes

let rec findNextPrime candidate primes =
    if isPrime candidate primes then
        candidate::primes
    else findNextPrime (candidate + 1) primes

let findPrimes index =
    let rec looper primes =
        if List.length primes < index then
            looper (findNextPrime (List.head primes + 1) primes)
        else primes
    looper [2]

// warm-up
findPrimes(500)

let primes = time findPrimes 5555
printfn "%O" (List.head primes)
