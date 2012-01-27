let isFactor x y = x `mod` y == 0

let isPrime primes x = not $ any (isFactor x) primes

let nextPrime primes = until (isPrime primes) (+ 1) (head primes) : primes

let findPrimes i = until (\ps -> length ps > i) nextPrime [2]

main = findPrimes 2000


