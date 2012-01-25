/*
Takes around 940ms to complete for 5555 primes
 */

def isPrime(x, primes) {
    !primes.any {p -> x % p == 0}
}

def findPrimes(index) {
    primes = []
    for (candidate = 2; primes.size() < index; candidate++)
        if (isPrime(candidate, primes))
            primes.add(candidate)
    return primes;
}

// warm-up
findPrimes(500)

tic = System.nanoTime()
primes = findPrimes(5555)
toc = System.nanoTime() - tic

println("Elapsed time: " + (toc / 1e6) + "msecs")
println(primes.last())

