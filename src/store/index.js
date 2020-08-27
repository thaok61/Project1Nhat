import Vue from "vue";
import Vuex from "vuex";
 
Vue.use(Vuex);
 
export default new Vuex.Store({
    state: {
        userName: "admin",
        password: "admin",
        was_login: false,
        
        categories: [
            {id:0, name: "VĂN HỌC", description: ""},
            {id:1, name: "KINH TẾ", description: ""},
            {id:2, name: "TÂM LÝ - KĨ NĂNG SỐNG", description: ""},
            {id:3, name: "SÁCH THIẾU NHI", description: ""},
            {id:4, name: "TIỂU SỬ - HỒI KÝ", description: ""},
            {id:5, name: "GIÁO KHOA - THAM KHẢO", description: ""},
            {id:6, name: "SÁCH HỌC NGOẠI NGỮ", description: ""}
        ],

        books: [
            {id:0, name: "Cho tôi xin một vé về tuổi thơ", author: "Nguyen Nhat Anh", year: "2018", nxb: "NXB Tre", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_1233.jpg", quantity: "999", idCategory: "0"},
            
            {id:1, name: "Bí Mật Tư Duy Triệu Phú", author: "T Harv Eker", year: "2018", nxb: "NXB Tre", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_188995_1.jpg", quantity: "999", idCategory: "1"},
            
            {id:2, name: "Người Giàu Có Nhất Thành Babylon", author: "George S Clason", year: "2019", nxb: "NXB Tổng Hợp TPHCM", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_195509_1_6585.jpg", quantity: "999", idCategory: "2"},
            
            {id:3, name: "Thám Tử Lừng Danh Conan", author: "Gosho Aoyama, Yutaka Abe,", year: "2019", nxb: "NXB Kim Đồng", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/o/conan-tap-97.jpg", quantity: "999", idCategory: "3"},
            
            {id:4, name: "Khi Hơi Thở Hóa Thinh Không ", author: "Paul Kalanithi", year: "2018", nxb: "NXB Lao Động", 
                image: "https://cdn0.fahasa.com/media/flashmagazine/images/page_images/khi_hoi_tho_hoa_thinh_khong/2017_08_17_08_46_54_1.jpg", quantity: "999", idCategory: "4"},
            
            {id:5, name: "Giải Tích - Tập 1 - Calculus 7e ", author: "James Stewart", year: "2018", nxb: "Cengage Learning Và NXB Hồng Đức",
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/g/t/gt1.jpg", quantity: "999", idCategory: "5"},
            {id:6, name: "Cẩm Nang Cấu Trúc Tiếng Anh ", author: "Trang Anh", year: "2018", nxb: "NXB Đại Học Sư Phạm", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_187866.jpg", quantity: "999", idCategory: "6"},
            {id:7, name: "Rừng Nauy", author: "Haruki Murakami", year: "2018", nxb: "NXB Văn Học", 
                image: "https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/u/rung-nauy_2_2_1.jpg", quantity: "999", idCategory: "0"},
        ],

        orders: [
            {id:0, idBook: 0, nameBook: "Cho tôi xin một vé về tuổi thơ", date: "2020-08-27", idSV: "20163698" ,isReturnBook: false},
            {id:1, idBook: 1, nameBook: "Bí Mật Tư Duy Triệu Phú", date: "2020-07-26", idSV: "20163668" ,isReturnBook: true},
            {id:2, idBook: 2, nameBook: "Người Giàu Có Nhất Thành Babylon", date: "2020-06-27", idSV: "20163638" ,isReturnBook: true},
            {id:3, idBook: 3, nameBook: "Thám Tử Lừng Danh Conan", date: "2020-04-23", idSV: "20143668" ,isReturnBook: false},
        ]
    },
    getters: {

        getCategoryById: (state) => (id) => {
            return state.categories.find(category => category.id === id)
        },
        getCategoryIndexById: (state) => (id) => {
            return state.categories.findIndex(category => category.id === id)
        },
        deleteCategory: (state) => (id) => {
            state.categories = state.categories.filter(category => category.id != id);
            return 1
        },
        categoriesCount: (state) => {
            return state.categories[state.categories.length - 1].id + 1
        },

        getBookById: (state) => (id) => {
            return state.books.find(book => book.id === id)
        },
        getBookByAuthor: (state) => (author) => {
            return state.books.find(book => book.author === author)
        },
        booksCount: (state) => {
            return state.books[state.books.length - 1].id + 1
        },
        getBookIndexById: (state) => (id) => {
            return state.books.findIndex(book => book.id === id)
        },

        getOrderById: (state) => (id) => {
            return state.orders.find(order => order.id === id)
        },
        ordersCount: (state) => {
            return state.orders[state.orders.length - 1].id + 1
        },
        getOrderNotReturn: (state) => () => {
            return state.categories.filter(category => category.isReturnBook == false)
        }
    },
    mutations: {},
    actions: {}
});