import React, { useEffect, useState } from 'react';
import S from './style.js';
import Star from '../main/images/star.svg';
import ItemContainer2 from './ItemContainer2.js';
import { NavLink, useNavigate } from 'react-router-dom';
import Arrow from './Arrow.js';

const ProductMain = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [clickSort, setClickSort] = useState("like");
    const [isUpdated, setIsUpdated] = useState(false)

    // pagination
    const [page,setPage] = useState(1); // 페이지
    const limit = 9; // 한페이지에 보여질 목록
    const offset = (page-1)*limit; //시작점과 끝점을 구하는 offset
    
        
        const getProduct = async () => {
            const response = await fetch(`http://localhost:8000/product/get?clickSort=${clickSort}`)
            const datas = await response.json();
            setProducts(datas);
        
        }
        console.log(products)
        
        useEffect(()=>{
            getProduct()
        },[isUpdated])

        const postData = (products) => {
            if(products){
                // 페이지에 해당하는 개수 slice함
                let result = products.slice(offset,offset+limit);
                return result;
            }
        }

    return (
        <>
        <S.ProductHeader>
            <S.ProductNum>총 {products.length}건</S.ProductNum>
            <S.FilterWrapper>
                <S.ProductTagWrapper>
                    <NavLink to="/product/new" className={ ({isActive}) => isActive ? 'active' : 'normal'}><S.NewButton>NEW</S.NewButton></NavLink>
                    <NavLink to="/product/best" className={ ({isActive}) => isActive ? 'active' : 'normal'}><S.BestButton>BEST</S.BestButton></NavLink>
                    <NavLink to="/product/sale" className={ ({isActive}) => isActive ? 'active' : 'normal'}><S.SaleButton>SALE</S.SaleButton></NavLink>
                </S.ProductTagWrapper>
                <S.ProductSortWrapper>
                    <button className={clickSort === "like" ? "active" : "normal"} onClick={()=>{setClickSort("like"); setIsUpdated(!isUpdated)} }><p>좋아요순</p></button>
                    <button className={clickSort === "review" ? "active" : "normal"} onClick={()=>{setClickSort("review"); setIsUpdated(!isUpdated)} }><p>리뷰순</p></button>
                    <button className={clickSort === "amount" ? "active" : "normal"} onClick={()=>{setClickSort("amount"); setIsUpdated(!isUpdated)}}><p>판매량순</p></button>
                    <button className={clickSort === "lowCost" ? "active" : "normal"} onClick={()=>{setClickSort("lowCost"); setIsUpdated(!isUpdated)}}><p>낮은가격순</p></button>
                    <button className={clickSort === "highCost" ? "active" : "normal"} onClick={()=>{setClickSort("highCost"); setIsUpdated(!isUpdated)}}><p>높은가격순</p></button>
                </S.ProductSortWrapper>
            </S.FilterWrapper>
        </S.ProductHeader> 

        <S.ProductMainContainer>   
        {postData(products).map((product) => (
            <S.ItemContainerWrapper key={product._id}>
                <React.Fragment >
                <ItemContainer2 />
                <S.ItemClickDiv onClick={() => navigate(`/details?id=${product._id}`)}>
                <S.ItemTitle>{product.title}</S.ItemTitle>
                <S.ItemExplain>{product.description}</S.ItemExplain>
                <S.ItemPrice>
                    <S.Discount>{product.discount}%</S.Discount>{(product.price * (1 - product.discount / 100)).toLocaleString()}원
                    <S.OriginPrice>{`${product.price.toLocaleString()}원`}</S.OriginPrice>
                </S.ItemPrice>
                <S.ItemStar>
                    <img src={Star} alt="star" />
                    {product.star}
                    <S.Review>({product.review})</S.Review>
                    </S.ItemStar>
                    <S.ItemTagWrapper><S.Tag>{product.tag}</S.Tag></S.ItemTagWrapper>
                </S.ItemClickDiv>
                </React.Fragment>
            </S.ItemContainerWrapper>
            ))}
        </S.ProductMainContainer>
        <S.A_Div>
            <Arrow limit={limit} page={page} totalPosts={products.length} setPage={setPage} />
        </S.A_Div>
        </>

        // <S.ProductMainContainer>
                    
        //                 {products.map((product) => (
        //                     <S.ItemContainerWrapper key={product._id}>
        //                         <React.Fragment >
        //                         <ItemContainer2 />
        //                         <S.ItemClickDiv onClick={() => navigate("/details")}>
        //                         <S.ItemTitle>{product.title}</S.ItemTitle>
        //                         <S.ItemExplain>{product.description}</S.ItemExplain>
        //                         <S.ItemPrice>
        //                             <S.Discount>{product.discount}%</S.Discount>{(product.price * (1 - product.discount / 100)).toLocaleString()}원
        //                             <S.OriginPrice>{`${product.price.toLocaleString()}원`}</S.OriginPrice>
        //                         </S.ItemPrice>
        //                         <S.ItemStar>
        //                             <img src={Star} alt="star" />
        //                             {product.star}
        //                             <S.Review>({product.review})</S.Review>
        //                             </S.ItemStar>
        //                             <S.ItemTagWrapper><S.Tag>{product.tag}</S.Tag></S.ItemTagWrapper>
        //                         </S.ItemClickDiv>
        //                         </React.Fragment>
        //                     </S.ItemContainerWrapper>
        //                 ))}
        //         </S.ProductMainContainer>
    );
};

export default ProductMain;