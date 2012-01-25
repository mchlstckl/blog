;; Takes around 530ms to complete for 5555 primes

(defn prime? [x primes]
  (->> primes
    (some (fn [p] (== 0 (mod x p))))
    (not)))

(defn find-primes [index]
  (loop [primes []
         candidate 2]
    (if (< (count primes) index)
      (if (prime? candidate primes)
        (recur (conj primes candidate) (inc candidate))
        (recur primes (inc candidate)))
      primes)))

;; warm-up
(find-primes 500)

;; benchmark
(println (time (last (find-primes 5555))))

