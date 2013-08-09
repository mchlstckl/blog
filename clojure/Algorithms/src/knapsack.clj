(defrecord Item [name value weight])

(def vp-campaigns [(Item. "Acme" 200 2000000)
                   (Item. "Lorem" 400 3500000)
                   (Item. "Ipsum" 210 2300000)
                   (Item. "Dolor" 730 8000000)
                   (Item. "SIT" 1000 10000000)
                   (Item. "Amet" 160 1500000)
                   (Item. "Mauris" 100 1000000)])

(defn gcd [a b]
  (if (zero? b)
    a
    (recur b (mod a b))))

(defn reduce-problem [max-weight items]
  (let [weights (conj (map :weight items) max-weight)
        divider (reduce gcd weights)
        new-items (map #(Item. (:name %) (:value %) (/ (:weight %) divider)) items)
        new-max-weight (/ max-weight divider)]
    [new-max-weight (sort-by #(/ (:weight %) (:value %)) new-items)]))

(reduce-problem 32356000 vp-campaigns)

(defn kp [max-weight items]
  (let [sack (for [j (range (inc max-weight))] [0 (for [i (range (count items))] 0)])
        iitems (map-indexed vector items)]
  (map (fn [i item]
         (let [{:keys [name value weight]} item]
           (loop [w weight
                  s sack]
             (let [old-sack sa])))
         ) iitems)
    ))
