# ruby:     1795ms
# jruby:    1440ms

def is_prime(x, primes)
    return nil == primes.index {|p| x % p == 0}
end

def find_primes(index)
    primes = []
    candidate = 2
    while primes.length < index
        if is_prime(candidate, primes)
            primes << candidate
        end
        candidate += 1
    end
    return primes
end

tic = Time.now
primes = find_primes(2000)
toc = Time.now - tic

puts "Elapsed time: #{toc * 1000}msecs"
puts primes.last
