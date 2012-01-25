/*
38ms
 */

import java.util.ArrayList;
import java.util.List;

public class PrimusNaivusJava {

    private static boolean isPrime(int candidate, List<Integer> primes) {
        for (int prime : primes)
            if (candidate % prime == 0)
                return false;
        return true;
    }

    private static List<Integer> findPrimes(int numPrimes) {
        List<Integer> primes = new ArrayList<Integer>();
        for (int candidate = 2; primes.size() < numPrimes; candidate++)
            if (isPrime(candidate, primes))
                primes.add(candidate);
        return primes;
    }

    public static void main(String[] args) {
        // warm-up
        findPrimes(500);

        long tic = System.nanoTime();
        List<Integer> primes = findPrimes(5555);
        long toc = System.nanoTime() - tic;

        System.out.println("Elapsed time: " + (toc / 1e6) + "msecs");
		System.out.println(primes.get(primes.size() - 1));
    }
}
