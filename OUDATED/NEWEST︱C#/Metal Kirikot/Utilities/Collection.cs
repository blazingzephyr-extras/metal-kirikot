using ObjectModel = System.Collections.ObjectModel;


namespace MetalKirikot.Utilities {

    public class Collection<T> : ObjectModel.Collection<T> {

        public Collection(params T[] elements) : base(list: elements) { }

        public void AddRange(params T[] elements) {

            foreach (T element in elements)
                Add(item: element);
        }
    }
}
