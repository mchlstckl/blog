/**
  * Based on http://michid.wordpress.com/2009/02/23/function_mem/
  */
object FibApp extends App {  

  /**
   * Basic fibonacci number generator
   *
   * @param n index of fibonacci number
   * @return the fibonacci number
   */
  def fib(n: Long): Long = n match {
    case 0 | 1 => 1
    case _     => fib(n - 2) + fib(n - 1)
  }

  /**
   * Fibonacci number generator that takes a recursive function as
   * an argument and returns a fibonacci function
   *
   * @param f function used for recursion
   * @param n index of fibonacci number
   * @return the fibonacci number
   */
  def fibCurry(f: Long => Long)(n: Long): Long = n match {
    case 0 | 1 => 1
    case _     => f(n - 1) + f(n - 2)
  }

  /**
   * This piece of code seems a bit strange, sometimes get negative times
   *
   * @param code code to execute
   * @return result from calling code
   */
  def time[T](code: => T) = {
    val tic = System.nanoTime
    val result = code
    val toc = System.nanoTime

    println("Time: " + ((toc - tic).doubleValue / 1e6) + "ms")
    result
  }

  /**
   * class extends Function1, written as (T => R)
   * e.g., f(x) = y where x is in subset of T and y in superset of R
   *
   * @link http://www.hars.de/2009/10/variance-with-horses-and-people.html
   * @link http://en.wikipedia.org/wiki/Covariance_and_contravariance_(computer_science)
   *
   * @param f Function1 function
   */
  class Memoize1[-T, +R](f: T => R) extends (T => R) {

    private[this] val memorized = scala.collection.mutable.Map.empty[T, R]

    // function apply is automatically called when using operator ()
    def apply(x: T): R = {
      memorized.getOrElseUpdate(x, f(x))
    }
  }

  /**
   * declare object (singleton) Memoize1, like a Memoize1 factory
   */
  object Memoize1 {

    /**
     * apply is used when we write Memoize1(f), same as Memoize1.apply(f)
     */
    def apply[T, R](f: T => R) = new Memoize1(f)

    def Y[T, R](f: (T => R) => T => R): (T => R) = {
      lazy val yf: T => R = Memoize1(f(yf)(_))
      yf
    }
  }

  val fibMem = Memoize1.Y(fibCurry)
  val max = 34

  time(println(fibMem(max)))
  println("--------------")
  time(println(fib(max)))
}
