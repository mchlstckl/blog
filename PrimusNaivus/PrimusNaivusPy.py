# Python:   795ms
# Pypy:     325ms
# Jython:   1345ms

import time

def is_prime(x, primes):
	return not any(x % p == 0 for p in primes)

def find_primes(index):
	primes = []
	candidate = 2
	while len(primes) < index:
		if is_prime(candidate, primes):
			primes.append(candidate)
		candidate += 1
	return primes

# warm-up
find_primes(500)

tic = time.clock()
primes = find_primes(5555)
toc = time.clock() - tic

print "Elapsed time: ", str(toc * 1000), "msecs"
print primes.pop()
