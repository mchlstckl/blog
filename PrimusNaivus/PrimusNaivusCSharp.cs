using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

//	mono:	160ms

namespace PrimuNaivusCSharp
{
	class MainClass
	{
		private static bool isPrime(int x, List<int> primes)
		{
			return !primes.Any(p => x % p == 0);
		}
		
		private static List<int> findPrimes(int index)
		{
			var primes = new List<int>();
			for (int candidate = 2; primes.Count < index; candidate++)
				if (isPrime(candidate, primes))
					primes.Add(candidate);
			return primes;
		}
		
		public static void Main (string[] args)
		{
			var watch = Stopwatch.StartNew();
			var primes = findPrimes(5555);
			watch.Stop();
			
			Console.WriteLine("Elapsed time: " + watch.ElapsedMilliseconds + "msecs");
			Console.WriteLine(primes.Last());
		}
	}
}

