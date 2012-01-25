object PrimusNaivusScala {

  def isPrime(x: Int, primes: List[Int]) = !primes.exists(x % _ == 0)

  def findNextPrime(primes: List[Int], candidate: Int): List[Int] =
    if (isPrime(candidate, primes))
      candidate :: primes
    else findNextPrime(primes, candidate + 1)

  def findPrimes(index: Int) = {
    def looper(primes: List[Int]): List[Int] =
      if (primes.size < index)
        looper(findNextPrime(primes, primes.head + 1))
      else primes
    looper(List(2))
  }

  def main(args: Array[String]) {
    // warm-up
    findPrimes(500)

    val tic = System.nanoTime()
    val primes = findPrimes(5555)
    val toc = System.nanoTime() - tic

    println("Elapsed time: " + (toc / 1e6) + "msecs")
    println(primes.head)
  }
}
