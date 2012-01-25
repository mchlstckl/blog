<?php

function is_prime($x, $primes) {
	foreach ($primes as $prime) {
		if ($x % $prime == 0)
			return false;
	}
	return true;
}

function find_primes($index) {
	$primes = array();
	for ($candidate = 2; count($primes) < $index; $candidate++)
		if (is_prime($candidate, $primes)) 
			$primes[] = $candidate;
	return $primes;
}

# warm-up
find_primes(500);

$tic = microtime(true);
$primes = find_primes(5555);
$ms = (microtime(true) - $tic) / 1000;

print "Elapsed time: $ms msecs\n";
print array_pop($primes);
?>

