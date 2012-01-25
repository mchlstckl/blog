var println = typeof println == 'function' ? println : 
			  typeof print == 'function' ? print :           
              typeof console == 'object' ? console.log :  
              function () { };

function time(fn) {
    var tic = new Date().getTime()
    var result = fn()
    var toc = new Date().getTime() - tic
    println("Elapsed time: " + toc + " msecs")
    return result
}

function isPrime(x, primes) {
    for (var i = 0; i < primes.length; i++)
        if (x % primes[i] == 0) return false
    return true
}

function findPrimes(index) {
    var primes = [];
    for (candidate = 2; primes.length < index; candidate++)
        if (isPrime(candidate, primes))
            primes.push(candidate)
    return primes
}

// warm-up
findPrimes(500)

var primes = time(function() {
    return findPrimes(5555)
})

println(primes.pop())
